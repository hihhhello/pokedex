import { Avatar, Divider, Typography, Box } from '@mui/material';
import { User } from 'shared/api';

interface Props {
  user: User;
  rating: number;
  text: string;
  actions?: React.ReactNode[];
}

export const PokemonReviewRow = (props: Props) => {
  const { rating, user, text, actions } = props;

  return (
    <Box
      aria-label="review-row"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid grey',
        borderRadius: 2,
      }}
    >
      <Box
        aria-label="review-row-header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 1,
          paddingBlock: 0.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Avatar src={user.avatarUrl} />
          <Typography fontSize={18}>{user.name || user.login}</Typography>
        </Box>
        <Typography fontSize={20}>{rating}/5</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          paddingInline: 1,
          paddingBlock: 0.5,
        }}
        aria-label="review-row-body"
      >
        {text}
      </Box>
      {actions && (
        <>
          <Divider />
          <Box>{actions.map((item) => item)}</Box>
        </>
      )}
    </Box>
  );
};
