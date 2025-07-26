
'use server';

import { z } from "zod";
import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

// NOTE: In a real application, you would handle file uploads to a service like Firebase Storage or S3.
// For this example, we will just save a placeholder path.
const handleFileUpload = async (file: File): Promise<string> => {
  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);
  // Example:
  // const path = `uploads/${Date.now()}_${file.name}`;
  // await storage.bucket().file(path).save(buffer);
  // return path;
  console.log(`Uploading ${file.name}... (placeholder)`);
  return `/uploads/placeholder_${file.name}`;
};

const admissionFormSchema = z.object({
  studentNameBn: z.string().min(1),
  studentNameEn: z.string().min(1),
  dob: z.string().min(1),
  birthCertNo: z.string().min(1),
  gender: z.string().min(1),
  religion: z.string().min(1),
  bloodGroup: z.string().optional(),
  applyingForClass: z.string().min(1),
  previousSchool: z.string().optional(),
  fatherNameBn: z.string().min(1),
  fatherNameEn: z.string().min(1),
  fatherNid: z.string().min(1),
  fatherMobile: z.string().min(1),
  motherNameBn: z.string().min(1),
  motherNameEn: z.string().min(1),
  motherNid: z.string().min(1),
  motherMobile: z.string().min(1),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  studentPhoto: z.instanceof(File),
  birthCertPhoto: z.instanceof(File),
});

export async function saveAdmissionApplication(formData: FormData) {
  try {
    if (!pool) {
      throw new Error("Database not connected.");
    }

    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = admissionFormSchema.safeParse(rawFormData);
    
    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        error: "ফর্মের ডেটা অবৈধ।",
      };
    }
    
    const { data } = validatedFields;

    // Handle file uploads (placeholder)
    const studentPhotoPath = await handleFileUpload(data.studentPhoto);
    const birthCertPhotoPath = await handleFileUpload(data.birthCertPhoto);

    const query = `
      INSERT INTO admission_applications (
        student_name_bn, student_name_en, dob, birth_cert_no, gender, religion, blood_group,
        applying_for_class, previous_school,
        father_name_bn, father_name_en, father_nid, father_mobile,
        mother_name_bn, mother_name_en, mother_nid, mother_mobile,
        present_address, permanent_address,
        student_photo_path, birth_cert_photo_path,
        status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const values = [
      data.studentNameBn, data.studentNameEn, data.dob, data.birthCertNo, data.gender, data.religion, data.bloodGroup || null,
      data.applyingForClass, data.previousSchool || null,
      data.fatherNameBn, data.fatherNameEn, data.fatherNid, data.fatherMobile,
      data.motherNameBn, data.motherNameEn, data.motherNid, data.motherMobile,
      data.presentAddress, data.permanentAddress,
      studentPhotoPath, birthCertPhotoPath
    ];

    await pool.query(query, values);
    
    revalidatePath('/admin/admissions'); // Optional: revalidate an admin page if you have one

    return { success: true };
  } catch (error) {
    console.error("Failed to save admission application:", error);
    return {
      success: false,
      error: "আবেদন জমা দেওয়ার সময় একটি সার্ভার ত্রুটি হয়েছে।",
    };
  }
}
