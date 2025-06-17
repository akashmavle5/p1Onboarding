'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, ArrowLeft, Shield, DollarSign, Phone } from 'lucide-react';

const consentSchema = z.object({
  hipaaConsent: z.boolean().refine(val => val === true, {
    message: 'HIPAA consent is required to proceed',
  }),
  treatmentConsent: z.boolean().refine(val => val === true, {
    message: 'Treatment consent is required to proceed',
  }),
  financialResponsibility: z.boolean().refine(val => val === true, {
    message: 'Financial responsibility acknowledgment is required',
  }),
  communicationConsent: z.boolean().refine(val => val === true, {
    message: 'Communication consent is required to proceed',
  }),
});

type ConsentData = z.infer<typeof consentSchema>;

interface ConsentStepProps {
  data: ConsentData;
  onUpdate: (data: ConsentData) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ConsentStep({ data, onUpdate, onNext, onPrev }: ConsentStepProps) {
  const form = useForm<ConsentData>({
    resolver: zodResolver(consentSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: ConsentData) => {
    onUpdate(formData);
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Consent & Privacy Agreements
        </CardTitle>
        <CardDescription>
          Please review and accept the following agreements. All consents are required to complete your registration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="hipaaConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">
                              HIPAA Privacy Notice and Consent *
                            </FormLabel>
                            <p className="text-sm text-gray-600">
                              I acknowledge that I have received and reviewed the Notice of Privacy Practices, 
                              which describes how my health information may be used and disclosed. I understand 
                              that I have the right to review this notice before signing this consent. I consent 
                              to the use and disclosure of my health information for treatment, payment, and 
                              healthcare operations.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormMessage />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="treatmentConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">
                              Consent for Treatment *
                            </FormLabel>
                            <p className="text-sm text-gray-600">
                              I voluntarily consent to the medical and healthcare services provided by MedCare 
                              Health System and its healthcare providers. I understand that no guarantee has 
                              been made regarding the outcome of treatment or examination. I authorize the 
                              healthcare providers to administer treatment as they deem necessary.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormMessage />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="financialResponsibility"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">
                              Financial Responsibility Agreement *
                            </FormLabel>
                            <p className="text-sm text-gray-600">
                              I understand that I am financially responsible for all charges whether or not 
                              covered by insurance. I authorize MedCare Health System to file claims with 
                              my insurance company and accept assignment of benefits. I agree to pay any 
                              deductibles, co-payments, or non-covered services at the time of service.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormMessage />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="communicationConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium">
                              Communication Consent *
                            </FormLabel>
                            <p className="text-sm text-gray-600">
                              I consent to receive communications from MedCare Health System including 
                              appointment reminders, test results, and other healthcare-related information 
                              via phone calls, text messages, and email at the contact information provided. 
                              I understand that I can opt out of these communications at any time.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormMessage />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> By checking these boxes and proceeding, you are providing your 
                electronic signature for these agreements. These consents are legally binding and equivalent 
                to your handwritten signature.
              </p>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onPrev}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button type="submit">Complete Registration</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}