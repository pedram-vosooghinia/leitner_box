import { Paper, Typography, CircularProgress, Box } from "@mui/material";

const CardBox = ({ boxNumber, cards, loading }) => {
  const filteredCards = cards.filter((card) => card.box === boxNumber);

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        جعبه {boxNumber}
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {filteredCards.length === 0 ? (
            <Typography>کارت موجود نیست</Typography>
          ) : (
            filteredCards.map((card) => (
              <Typography key={card.id} style={{ marginBottom: "8px" }}>
                {card.question}
              </Typography>
            ))
          )}
        </Box>
      )}
    </Paper>
  );
};

export default CardBox;
