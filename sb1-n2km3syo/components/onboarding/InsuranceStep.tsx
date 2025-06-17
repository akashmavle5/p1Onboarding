'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, ArrowLeft } from 'lucide-react';

const insuranceSchema = z.object({
  provider: z.string().min(1, 'Insurance provider is required'),
  policyNumber: z.string().min(1, 'Policy number is required'),
  groupNumber: z.string().min(1, 'Group number is required'),
  subscriberName: z.string().min(1, 'Subscriber name is required'),
  subscriberDOB: z.string().min(1, 'Subscriber date of birth is required'),
  relationshipToSubscriber: z.string().min(1, 'Relationship to subscriber is required'),
});

type InsuranceData = z.infer<typeof insuranceSchema>;

interface InsuranceStepProps {
  data: InsuranceData;
  onUpdate: (data: InsuranceData) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function InsuranceStep({ data, onUpdate, onNext, onPrev }: InsuranceStepProps) {
  const form = useForm<InsuranceData>({
    resolver: zodResolver(insuranceSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: InsuranceData) => {
    onUpdate(formData);
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Insurance Information
        </CardTitle>
        <CardDescription>
          Please provide your insurance details. This information is required for billing and verification purposes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Provider</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your insurance provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="aetna">Aetna</SelectItem>
                      <SelectItem value="anthem">Anthem</SelectItem>
                      <SelectItem value="bcbs">Blue Cross Blue Shield</SelectItem>
                      <SelectItem value="cigna">Cigna</SelectItem>
                      <SelectItem value="humana">Humana</SelectItem>
                      <SelectItem value="kaiser">Kaiser Permanente</SelectItem>
                      <SelectItem value="medicare">Medicare</SelectItem>
                      <SelectItem value="medicaid">Medicaid</SelectItem>
                      <SelectItem value="tricare">Tricare</SelectItem>
                      <SelectItem value="united">United Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="policyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter policy number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter group number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
              <h3 className="font-medium text-gray-900">Subscriber Information</h3>
              <p className="text-sm text-gray-600">
                The subscriber is the person who holds the insurance policy (may be you or someone else).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subscriberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscriber Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subscriberDOB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscriber Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="relationshipToSubscriber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Relationship to Subscriber</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="self">Self</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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