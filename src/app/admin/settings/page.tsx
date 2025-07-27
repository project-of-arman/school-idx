
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSiteSettings } from "@/lib/settings-data";
import SettingsForm from "@/components/admin/settings/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>সাইট সেটিংস</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          এই তথ্যগুলো আপনার ওয়েবসাইটের SEO এবং ব্রাউজার ট্যাবে ব্যবহৃত হবে।
        </p>
        <SettingsForm settings={settings} />
      </CardContent>
    </Card>
  );
}
