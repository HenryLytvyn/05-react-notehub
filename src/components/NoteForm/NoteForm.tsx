import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import { useId } from "react";
import css from "./NoteForm.module.css";
import type { NoteProps } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import * as Yup from "yup";

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NoteProps = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const addNote = useMutation({
    // mutationFn: (newNote: NoteProps) => createNotes(newNote),
    mutationFn: createNote,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["allNotes"],
      });
    },
  });

  function handleSubmit(values: NoteProps, actions: FormikHelpers<NoteProps>) {
    addNote.mutate(values);
    actions.resetForm();
  }

  const FormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title is too long")
      .required("Title is required"),
    content: Yup.string().max(500, "The note is too long"),
    tag: Yup.string().required("This field is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            name="content"
            rows="8"
            className={css.textarea}
            as="textarea"
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo" defaultValue={"lalala"}>
              Todo
            </option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={addNote.isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
