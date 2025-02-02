import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addCardsService } from "@/services/cards";
import toast from "react-hot-toast";
import LoadingModal from "./MainComponents/LoadingModal";
import { AddCardFormProps } from "../../type";
import Modal from "@/components/MainComponents/Modal";
import { useModalStore } from "@/store/modalStore";

const AddCardForm = () => {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCardFormProps>();

  const onSubmit = async (data: AddCardFormProps) => {
    try {
      setLoading(true);
      await addCardsService(data);
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
            <label className="block text-sm font-medium mb-1">سوال</label>
            <input
              id="question"
              type="text"
              className=" ltr w-full px-3 py-2 border rounded-lg"
              {...register("question", {
                required: "وارد کردن سوال الزامی است",
              })}
            />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">پاسخ</label>
            <input
              id="answer"
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("answer", {
                required: "وارد کردن پاسخ الزامی است",
              })}
            />
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            افزودن کارت
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddCardForm;
