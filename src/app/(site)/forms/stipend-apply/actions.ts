
'use server';

import { z } from "zod";
import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

/*
SQL for creating the stipend_applications table:

CREATE TABLE `stipend_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `roll_no` varchar(50) NOT NULL,
  `session` varchar(100) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `guardian_yearly_income` varchar(100) NOT NULL,
  `reason` text NOT NULL,
  `contact_mobile` varchar(50) NOT NULL,
  `nagad_mobile` varchar(50) NOT NULL,
  `sim_owner_name` varchar(255) NOT NULL,
  `birth_cert_photo_path` longtext,
  `nid_photo_path` longtext,
  `optional_photo_path` longtext,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

*/

const formSchema = z.object({
  studentName: z.string().min(1),
  className: z.string().min(1),
  rollNo: z.string().min(1),
  session: z.string().min(1),
  fatherName: z.string().min(1),
  motherName: z.string().min(1),
  guardianYearlyIncome: z.string().min(1),
  reason: z.string().min(1),
  mobile: z.string().min(1),
  nagadMobile: z.string().min(1),
  simOwnerName: z.string().min(1),
  birthCertPhoto: z.string().min(1),
  nidPhoto: z.string().min(1),
  optionalPhoto: z.string().optional(),
});

export async function saveStipendApplication(formData: FormData) {
  try {
    if (!pool) {
      throw new Error("Database not connected.");
    }

    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = formSchema.safeParse(rawFormData);
    
    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten().fieldErrors);
      return { success: false, error: "ফর্মের ডেটা অবৈধ।" };
    }
    
    const { data } = validatedFields;

    const query = `
      INSERT INTO stipend_applications (
        student_name, class_name, roll_no, session, father_name, mother_name, guardian_yearly_income, 
        reason, contact_mobile, nagad_mobile, sim_owner_name, birth_cert_photo_path, nid_photo_path,
        optional_photo_path, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const values = [
      data.studentName, data.className, data.rollNo, data.session,
      data.fatherName, data.motherName, data.guardianYearlyIncome, data.reason, data.mobile,
      data.nagadMobile, data.simOwnerName, data.birthCertPhoto, data.nidPhoto,
      data.optionalPhoto || null
    ];

    await pool.query(query, values);
    
    revalidatePath('/admin/forms');

    return { success: true };
  } catch (error) {
    console.error("Failed to save stipend application:", error);
    return { success: false, error: "আবেদন জমা দেওয়ার সময় একটি সার্ভার ত্রুটি হয়েছে।" };
  }
}
