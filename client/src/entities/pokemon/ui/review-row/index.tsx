import { Box } from '@mui/system';
import { User } from 'shared/api';

interface Props {
  user: User;
  rating: number;
}

export const PokemonReviewRow = (props: Props) => {
  const { rating, user } = props;

  const isLongDescr = false;

  return (
    <Box aria-label="review-row">
      <Box aria-label="review-row-header"></Box>
      <Box aria-label="review-row-body"></Box>
      {isLongDescr && <Box aria-label="review-row-footer"></Box>}
    </Box>
  );
};
