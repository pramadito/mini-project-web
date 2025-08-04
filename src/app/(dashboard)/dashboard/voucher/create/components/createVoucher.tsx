"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import useCreateVoucher from "../_hooks/useCreateVoucher";

interface VoucherFormValues {
  code: string;
  value: number;
  stock: number;
  event: string;
}

interface EventOption {
  id: number;
  title: string;
}

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  value: Yup.number().required("Value is required").min(1, "Min 1"),
  stock: Yup.number().required("Stock is required").min(1, "Min 1"),
  event: Yup.string().required("Event is required"),
});

const CreateVoucher = () => {
  const createVoucher = useCreateVoucher();
  const [events, setEvents] = useState<EventOption[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get("/events");
        setEvents(res.data.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="container mx-auto mt-10 px-4 pb-20">
      <h1 className="mb-6 text-3xl font-bold text-orange-500">Create Voucher</h1>

      <Formik<VoucherFormValues>
        initialValues={{
          code: "",
          value: 1,
          stock: 1,
          event: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createVoucher.mutateAsync(values);
            resetForm();
          } catch (err) {
            console.error("Failed to submit", err);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="code">Code *</Label>
                  <Field name="code" as={Input} placeholder="Voucher Code" />
                  <ErrorMessage name="code" component="div" className="text-sm text-red-500" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="value">Value *</Label>
                  <Field name="value" type="number" as={Input} min={1} placeholder="Voucher value" />
                  <ErrorMessage name="value" component="div" className="text-sm text-red-500" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="stock">Stock *</Label>
                  <Field name="stock" type="number" as={Input} min={1} placeholder="Voucher stock" />
                  <ErrorMessage name="stock" component="div" className="text-sm text-red-500" />
                </div>
              </div>

              {/* Right */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="event">Event *</Label>
                  <Field
                    as="select"
                    name="event"
                    className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="">Select event</option>
                    {loadingEvents ? (
                      <option disabled>Loading events...</option>
                    ) : (
                      events.map((event) => (
                        <option key={event.id} value={String(event.id)}>
                          {event.title}
                        </option>
                      ))
                    )}
                  </Field>
                  <ErrorMessage name="event" component="div" className="text-sm text-red-500" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                {isSubmitting ? "Submitting..." : "Submit Voucher"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default CreateVoucher;
