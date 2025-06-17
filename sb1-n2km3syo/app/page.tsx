'use client';

import { useState } from 'react';
import { PersonalInfoStep } from '@/components/onboarding/PersonalInfoStep';
import { InsuranceStep } from '@/components/onboarding/InsuranceStep';
import { MedicalHistoryStep } from '@/components/onboarding/MedicalHistoryStep';
import { EmergencyContactsStep } from '@/components/onboarding/EmergencyContactsStep';
import { ConsentStep } from '@/components/onboarding/ConsentStep';
import { CompletionStep } from '@/components/onboarding/CompletionStep';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, FileText, CheckCircle, User } from 'lucide-react';

export interface OnboardingData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    maritalStatus: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    subscriberName: string;
    subscriberDOB: string;
    relationshipToSubscriber: string;
  };
  medicalHistory: {
    primaryPhysician: string;
    allergies: string;
    currentMedications: string;
    medicalConditions: string;
    surgicalHistory: string;
    familyHistory: string;
  };
  emergencyContacts: {
    primary: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
    secondary: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
  };
  consent: {
    hipaaConsent: boolean;
    treatmentConsent: boolean;
    financialResponsibility: boolean;
    communicationConsent: boolean;
  };
}

const initialData: OnboardingData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    gender: '',
    maritalStatus: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  },
  insurance: {
    provider: '',
    policyNumber: '',
    groupNumber: '',
    subscriberName: '',
    subscriberDOB: '',
    relationshipToSubscriber: '',
  },
  medicalHistory: {
    primaryPhysician: '',
    allergies: '',
    currentMedications: '',
    medicalConditions: '',
    surgicalHistory: '',
    familyHistory: '',
  },
  emergencyContacts: {
    primary: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
    },
    secondary: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
    },
  },
  consent: {
    hipaaConsent: false,
    treatmentConsent: false,
    financialResponsibility: false,
    communicationConsent: false,
  },
};

const steps = [
  { id: 'personal', title: 'Personal Information', icon: User },
  { id: 'insurance', title: 'Insurance Details', icon: Shield },
  { id: 'medical', title: 'Medical History', icon: Heart },
  { id: 'emergency', title: 'Emergency Contacts', icon: Users },
  { id: 'consent', title: 'Consent & Privacy', icon: FileText },
  { id: 'complete', title: 'Complete', icon: CheckCircle },
];

export default function PatientOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isStarted, setIsStarted] = useState(false);

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={data.personalInfo}
            onUpdate={(personalInfo) => updateData({ personalInfo })}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <InsuranceStep
            data={data.insurance}
            onUpdate={(insurance) => updateData({ insurance })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <MedicalHistoryStep
            data={data.medicalHistory}
            onUpdate={(medicalHistory) => updateData({ medicalHistory })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <EmergencyContactsStep
            data={data.emergencyContacts}
            onUpdate={(emergencyContacts) => updateData({ emergencyContacts })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <ConsentStep
            data={data.consent}
            onUpdate={(consent) => updateData({ consent })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return <CompletionStep data={data} />;
      default:
        return null;
    }
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to MedCare Health System
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Let's get you set up as a new patient. This process will take about 10-15 minutes and will help us provide you with the best possible care.
              </p>
            </div>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  What You'll Need
                </CardTitle>
                <CardDescription>
                  Please have the following information ready:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Personal Information</p>
                    <p className="text-sm text-gray-600">Name, date of birth, contact details, and address</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Insurance Information</p>
                    <p className="text-sm text-gray-600">Insurance card with policy and group numbers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Medical History</p>
                    <p className="text-sm text-gray-600">Current medications, allergies, and medical conditions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Emergency Contacts</p>
                    <p className="text-sm text-gray-600">Contact information for family members or friends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={() => setIsStarted(true)} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Begin Registration
            </Button>

            <p className="text-sm text-gray-500 mt-6">
              By proceeding, you acknowledge that you have read and agree to our privacy practices and terms of service.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Registration</h1>
            <p className="text-gray-600">Complete your registration to become a patient at MedCare Health System</p>
          </div>

          <ProgressIndicator steps={steps} currentStep={currentStep} />

          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}