
"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ResultWithSubjects, StudentForResultForm, saveResult } from "@/lib/actions/results-actions";
import { PlusCircle, Trash } from "lucide-react";

const subjectSchema = z.object({
  id: z.number().optional(),
  subject_name: z.string().min(1, "বিষয় আবশ্যক"),
  marks: z.coerce.number().min(0, "Marks must be positive").optional().nullable(),
  grade: z.string().min(1, "গ্রেড আবশ্যক"),
  gpa: z.coerce.number().min(0).max(5, "GPA 0 থেকে 5 এর মধ্যে হতে হবে"),
});

const formSchema = z.object({
  student_id: z.coerce.number().min(1, "শিক্ষার্থী নির্বাচন আবশ্যক"),
  exam_name: z.string().min(1, "পরীক্ষার নাম আবশ্যক"),
  year: z.coerce.number().min(2000, "বছর আবশ্যক"),
  final_gpa: z.coerce.number().min(0).max(5, "চূড়ান্ত GPA আবশ্যক"),
  status: z.string().min(1, "স্ট্যাটাস আবশ্যক"),
  subjects: z.array(subjectSchema).min(1, "ন্যূনতম একটি বিষয় যোগ করুন"),
});

type FormValues = z.infer<typeof formSchema>;

export function ResultForm({ result, students }: { result?: ResultWithSubjects, students: StudentForResultForm[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: result?.student_id || undefined,
      exam_name: result?.exam_name || "",
      year: result?.year || new Date().getFullYear(),
      final_gpa: result?.final_gpa || 0,
      status: result?.status || "Promoted",
      subjects: result?.subjects || [],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  async function onSubmit(values: FormValues) {
    const res = await saveResult(values, result?.id);
    if (res.success) {
      toast({ title: "সফল!", description: `ফলাফল সফলভাবে ${result ? 'আপডেট' : 'তৈরি'} করা হয়েছে।` });
      router.push("/admin/results");
      router.refresh();
    } else {
      toast({ title: "ত্রুটি", description: res.error, variant: "destructive" });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader><CardTitle>সাধারণ তথ্য</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label>শিক্ষার্থী</Label>
            <Controller
              name="student_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value?.toString()} disabled={!!result}>
                  <SelectTrigger><SelectValue placeholder="শিক্ষার্থী নির্বাচন করুন" /></SelectTrigger>
                  <SelectContent>
                    {students.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name_bn} (রোল: {s.roll})</SelectItem>)}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.student_id && <p className="text-sm font-medium text-destructive">{errors.student_id.message}</p>}
          </div>
          <div><Label htmlFor="exam_name">পরীক্ষার নাম</Label><Input id="exam_name" {...register("exam_name")} /><p className="text-xs text-muted-foreground mt-1">যেমন: বার্ষিক পরীক্ষা</p>{errors.exam_name && <p className="text-sm font-medium text-destructive">{errors.exam_name.message}</p>}</div>
          <div><Label htmlFor="year">বছর</Label><Input id="year" type="number" {...register("year")} />{errors.year && <p className="text-sm font-medium text-destructive">{errors.year.message}</p>}</div>
          <div><Label htmlFor="final_gpa">চূড়ান্ত GPA</Label><Input id="final_gpa" type="number" step="0.01" {...register("final_gpa")} />{errors.final_gpa && <p className="text-sm font-medium text-destructive">{errors.final_gpa.message}</p>}</div>
          <div>
            <Label>স্ট্যাটাস</Label>
             <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Promoted">Promoted</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-sm font-medium text-destructive">{errors.status.message}</p>}
          </div>
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
              <CardTitle>বিষয়ভিত্তিক গ্রেড</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="space-y-4">
                  {fields.map((field, index) => (
                      <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 border rounded-md relative">
                           <input type="hidden" {...register(`subjects.${index}.id`)} />
                           <div><Label>বিষয়ের নাম</Label><Input {...register(`subjects.${index}.subject_name`)} />{errors.subjects?.[index]?.subject_name && <p className="text-sm font-medium text-destructive">{errors.subjects?.[index]?.subject_name?.message}</p>}</div>
                           <div><Label>মার্ক</Label><Input type="number" {...register(`subjects.${index}.marks`)} />{errors.subjects?.[index]?.marks && <p className="text-sm font-medium text-destructive">{errors.subjects?.[index]?.marks?.message}</p>}</div>
                           <div><Label>গ্রেড</Label><Input {...register(`subjects.${index}.grade`)} />{errors.subjects?.[index]?.grade && <p className="text-sm font-medium text-destructive">{errors.subjects?.[index]?.grade?.message}</p>}</div>
                           <div><Label>GPA</Label><Input type="number" step="0.01" {...register(`subjects.${index}.gpa`)} />{errors.subjects?.[index]?.gpa && <p className="text-sm font-medium text-destructive">{errors.subjects?.[index]?.gpa?.message}</p>}</div>
                           <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash className="h-4 w-4" /></Button>
                      </div>
                  ))}
              </div>
               {errors.subjects?.root && <p className="text-sm font-medium text-destructive mt-2">{errors.subjects.root.message}</p>}
              <Button type="button" variant="outline" size="sm" onClick={() => append({ subject_name: '', marks: null, grade: '', gpa: 0 })} className="mt-4"><PlusCircle className="mr-2 h-4 w-4" /> বিষয় যোগ করুন</Button>
          </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>বাতিল করুন</Button>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'}</Button>
      </div>
    </form>
  )
}
