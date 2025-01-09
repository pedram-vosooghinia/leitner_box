import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddCardForm = ({ setCards }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) return;

    const newCard = { question, answer, box: 1 }; 

    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        const savedCard = await response.json();
        setCards((prev) => [...prev, savedCard]);
        setQuestion("");
        setAnswer("");
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        افزودن کارت جدید
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="سوال"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="جواب"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          افزودن
        </Button>
      </form>
    </Box>
  );
};

export default AddCardForm;
