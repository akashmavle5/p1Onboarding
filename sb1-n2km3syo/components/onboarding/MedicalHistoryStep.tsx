'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowLeft } from 'lucide-react';
import { OnboardingData } from '@/app/page';

const medicalHistorySchema = z.object({
  primaryPhysician: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  medicalConditions: z.string().optional(),
  surgicalHistory: z.string().optional(),
  familyHistory: z.string().optional(),
});

type MedicalHistoryData = z.infer<typeof medicalHistorySchema>;

interface MedicalHistoryStepProps {
  data: OnboardingData['medicalHistory'];
  onUpdate: (data: OnboardingData['medicalHistory']) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function MedicalHistoryStep({ data, onUpdate, onNext, onPrev }: MedicalHistoryStepProps) {
  const form = useForm<MedicalHistoryData>({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: data,
  });

  const onSubmit = (formData: MedicalHistoryData) => {
    // Transform the form data to ensure all fields are strings
    const transformedData: OnboardingData['medicalHistory'] = {
      primaryPhysician: formData.primaryPhysician || '',
      allergies: formData.allergies || '',
      currentMedications: formData.currentMedications || '',
      medicalConditions: formData.medicalConditions || '',
      surgicalHistory: formData.surgicalHistory || '',
      familyHistory: formData.familyHistory || '',
    };
    
    onUpdate(transformedData);
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Medical History
        </CardTitle>
        <CardDescription>
          Please provide your medical history information. This helps us provide better care and identify potential risks.
          All fields are optional, but providing accurate information is important for your safety.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="primaryPhysician"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Care Physician (if any)</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Smith at ABC Medical Center" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any allergies to medications, foods, or other substances. If none, write 'None' or 'NKDA' (No Known Drug Allergies)."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentMedications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List all current medications including prescription drugs, over-the-counter medications, vitamins, and supplements. Include dosages if known."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medical Conditions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any current medical conditions, chronic illnesses, or ongoing health issues (e.g., diabetes, hypertension, asthma, etc.)."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surgicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surgical History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any previous surgeries or procedures, including approximate dates if known."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="familyHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Medical History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List significant medical conditions in immediate family members (parents, siblings, children) such as heart disease, cancer, diabetes, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Please be as accurate and complete as possible. This information is confidential 
                and will only be used for your medical care. If you're unsure about any information, it\'s better to provide 
                your best estimate than to leave it blank.
              </p>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onPrev}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}