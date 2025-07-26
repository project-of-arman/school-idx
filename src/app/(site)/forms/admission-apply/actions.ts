
'use server';

import { z } from "zod";
import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

/*
SQL for creating the admission_applications table:

CREATE TABLE `admission_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name_bn` varchar(255) NOT NULL,
  `student_name_en` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `birth_cert_no` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `applying_for_class` varchar(50) NOT NULL,
  `previous_school` varchar(255) DEFAULT NULL,
  `father_name_bn` varchar(255) NOT NULL,
  `father_name_en` varchar(255) NOT NULL,
  `father_nid` varchar(100) NOT NULL,
  `father_mobile` varchar(50) NOT NULL,
  `mother_name_bn` varchar(255) NOT NULL,
  `mother_name_en` varchar(255) NOT NULL,
  `mother_nid` varchar(100) NOT NULL,
  `mother_mobile` varchar(50) NOT NULL,
  `present_address` text NOT NULL,
  `permanent_address` text NOT NULL,
  `student_photo_path` longtext,
  `birth_cert_photo_path` longtext,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

*/

// NOTE: In a real application, you would handle this base64 data URI by decoding it
// and uploading the buffer to a service like Firebase Storage or S3, then storing the URL.
// For this example, we will store the (long) data URI directly in the database.
const handleFileUpload = async (base64Data: string): Promise<string> => {
  // Example for saving to a cloud service:
  // const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
  // const mimeType = base64Data.match(/data:(.*);base64/)?.[1];
  // const fileExtension = mimeType?.split('/')[1] || 'bin';
  // const path = `uploads/${Date.now()}.${fileExtension}`;
  // await storage.bucket().file(path).save(buffer);
  // return `https://storage.googleapis.com/your-bucket/${path}`;
  console.log(`Saving base64 data URI to DB... (length: ${base64Data.length})`);
  return base64Data; // Storing the data URI directly for this example.
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
  studentPhoto: z.string().min(1, "Student photo is required"),
  birthCertPhoto: z.string().min(1, "Birth certificate is required"),
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

    // The data is already a base64 string, so we can pass it directly.
    // In a real app, you might upload it here and get back a URL.
    const studentPhotoPath = await handleFileUpload(data.studentPhoto);
    const birthCertPhotoPath = await handleFileUpload(data.birthCertPhoto);

    // The table needs to accept long text for the photo columns
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
