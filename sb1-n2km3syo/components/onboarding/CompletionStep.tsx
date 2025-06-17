'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, FileText, Phone, Mail, Download, Home } from 'lucide-react';
import { OnboardingData } from '@/app/page';

interface CompletionStepProps {
  data: OnboardingData;
}

export function CompletionStep({ data }: CompletionStepProps) {
  const handleScheduleAppointment = () => {
    // In a real application, this would navigate to scheduling system
    console.log('Navigate to appointment scheduling');
  };

  const handleDownloadSummary = () => {
    // In a real application, this would generate and download a PDF
    console.log('Download registration summary');
  };

  const handleGoHome = () => {
    // In a real application, this would navigate to patient portal
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Complete!</h2>
          <p className="text-lg text-gray-600">
            Welcome to MedCare Health System, {data.personalInfo.firstName}!
          </p>
        </div>
      </div>

      {/* Confirmation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Registration Confirmation
          </CardTitle>
          <CardDescription>
            Your patient registration has been successfully submitted and processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">Patient Information</h4>
                <p className="text-gray-600">
                  {data.personalInfo.firstName} {data.personalInfo.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  DOB: {new Date(data.personalInfo.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Contact Information</h4>
                <p className="text-gray-600">{data.personalInfo.phone}</p>
                <p className="text-gray-600">{data.personalInfo.email}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">Insurance Provider</h4>
                <p className="text-gray-600">{data.insurance.provider}</p>
                <p className="text-sm text-gray-500">
                  Policy: {data.insurance.policyNumber}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Emergency Contact</h4>
                <p className="text-gray-600">{data.emergencyContacts.primary.name}</p>
                <p className="text-sm text-gray-500">
                  {data.emergencyContacts.primary.relationship} • {data.emergencyContacts.primary.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900">All Consents Completed</h4>
                <p className="text-sm text-blue-700">
                  You have successfully provided all required consents including HIPAA privacy notice, 
                  treatment consent, financial responsibility, and communication preferences.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>
            Here are your next steps to complete your healthcare journey with us.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold">Schedule Your First Visit</h4>
              </div>
              <p className="text-sm text-gray-600">
                Book your initial consultation with one of our healthcare providers.
              </p>
              <Button onClick={handleScheduleAppointment} className="w-full">
                Schedule Appointment
              </Button>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold">Insurance Verification</h4>
              </div>
              <p className="text-sm text-gray-600">
                Our team will verify your insurance coverage within 24-48 hours.
              </p>
              <div className="text-sm text-gray-500">
                We'll contact you if additional information is needed.
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Important Reminders</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Please arrive 15 minutes early for your first appointment</li>
              <li>• Bring a valid photo ID and insurance card</li>
              <li>• Bring a list of current medications</li>
              <li>• You'll receive appointment confirmations via email and SMS</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Our patient services team is here to assist you with any questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Phone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Call Us</h4>
              <p className="text-sm text-gray-600">(555) 123-4567</p>
              <p className="text-xs text-gray-500">Mon-Fri 8AM-6PM</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Mail className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Email Us</h4>
              <p className="text-sm text-gray-600">support@medcare.com</p>
              <p className="text-xs text-gray-500">24-48 hour response</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Patient Portal</h4>
              <p className="text-sm text-gray-600">Access records online</p>
              <p className="text-xs text-gray-500">Available 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button onClick={handleDownloadSummary} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download Summary
        </Button>
        <Button onClick={handleScheduleAppointment}>
          <Calendar className="w-4 h-4 mr-2" />
          Schedule First Appointment
        </Button>
        <Button onClick={handleGoHome} variant="outline">
          <Home className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      {/* Footer Message */}
      <div className="text-center bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-2">Thank You for Choosing MedCare Health System</h3>
        <p className="text-green-700">
          We're committed to providing you with exceptional healthcare. Your registration information 
          has been securely stored and our team will be in touch with you soon.
        </p>
      </div>
    </div>
  );
}