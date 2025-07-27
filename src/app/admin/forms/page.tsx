
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formConfigs, getFormSubmissions } from "@/lib/actions/forms-actions";
import FormsTable from "@/components/admin/forms/forms-table";

export default async function AdminFormsPage() {
  const formTypes = Object.keys(formConfigs);
  const initialFormType = formTypes[0] || '';

  // Fetch initial data for the first tab to avoid waterfall
  const initialSubmissions = await getFormSubmissions(initialFormType);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>ফরমস ব্যবস্থাপনা</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={initialFormType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto">
            {formTypes.map((formType) => (
              <TabsTrigger key={formType} value={formType}>
                {formConfigs[formType].displayName}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {formTypes.map(async (formType) => {
            // Re-fetch inside the loop for each tab content.
            // Next.js will dedupe this fetch for the initial tab.
            const submissions = await getFormSubmissions(formType);
            return (
                <TabsContent key={formType} value={formType}>
                    <div className="py-4">
                        <FormsTable 
                            formType={formType} 
                            submissions={submissions} 
                            config={formConfigs[formType]} 
                        />
                    </div>
                </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
