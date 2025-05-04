import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postEmailData } from "@/services/mail-service";
import { toast } from "sonner";
import { useState } from "react";

const validationSchema = Yup.object({
  recipient_email: Yup.string()
    .email("Invalid email address")
    .required("Recipient is required"),
  subject: Yup.string()
    .max(100, "Subject too long")
    .required("Subject is required"),
  body: Yup.string().min(10, "body too short").required("body is required"),
});

export default function ComposeEmailForm({ onSuccess }: { onSuccess?: () => void }) {
const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      recipient_email: "",
      subject: "",
      body: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Replace this with your email API logic
      const formData = new FormData();
      formData.append("recipient_email", values.recipient_email); 
      formData.append("subject", values.subject);
      formData.append("body", values.body);
      try {
        setLoading(true);
        const res = await postEmailData(formData);
        if (res) {
          toast.success(res.message,{position:"top-right"});
          onSuccess?.();
          setLoading(false);
          resetForm();
        }
      } catch (error: any) {
        setLoading(false);
        toast.error("Request failed. Please try again", {
          position:"top-right"
        });
      }

    },
  });

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Compose Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-2" htmlFor="recipient_email">
              To
            </Label>
            <Input
              id="recipient_email"
              name="recipient_email"
              type="email"
              value={formik.values.recipient_email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.recipient_email &&
              formik.errors.recipient_email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.recipient_email}
                </p>
              )}
          </div>

          <div>
            <Label className="mb-2" htmlFor="subject">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.subject && formik.errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.subject}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2" htmlFor="body">
              Body
            </Label>
            <Textarea
              id="body"
              name="body"
              rows={6}
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.body && formik.errors.body && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.body}</p>
            )}
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
            {loading ? "Creating..." : "Create Email"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
