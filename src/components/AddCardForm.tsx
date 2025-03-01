import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addCardsService } from "@/services/cards";
import toast from "react-hot-toast";
import LoadingModal from "./MainComponents/LoadingModal";
import { AddCardFormProps } from "@/types/card";
import Modal from "@/components/MainComponents/Modal";
import { useModalStore } from "@/store/modalStore";
import useUserStore from "@/store/userStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const AddCardForm = () => {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModalStore();
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCardFormProps>({
    resolver: zodResolver(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    ),
  });

  const onSubmit = async (data: AddCardFormProps) => {
    try {
      setLoading(true);
      await addCardsService({ ...data, userId: user?.id });
      toast.success("کارت با موفقیت ثبت شد");
    } catch {
      toast.error("خطایی رخ داد");
    } finally {
      setLoading(false);
      closeModal();
    }
  };
  const buttonConfig = {
    modalName: "AddHashtag",
    buttonName: "افزودن کارت",
    className: "my-8",
  };

  if (loading) return <LoadingModal />;

  return (
    <div className="p-2">
      <Modal buttonConfig={buttonConfig}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto"
        >
          <h2 className="text-lg font-bold mb-4">افزودن کارت به باکس 1</h2>
          <div className="mb-4">
            <Label className="block text-sm font-medium mb-1">سوال</Label>
            <Textarea
              id="question"
              className="ltr w-full px-3 py-2 border rounded-lg"
              {...register("question", {
                required: "وارد کردن سوال الزامی است",
              })}
            />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label className="block text-sm font-medium mb-1">پاسخ</Label>
            <Textarea
              id="answer"
              className="ltr w-full px-3 py-2 border rounded-lg"
              {...register("answer", {
                required: "وارد کردن پاسخ الزامی است",
              })}
            />
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            افزودن کارت
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AddCardForm;
