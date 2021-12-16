import React, { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography, { TypographyProps } from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import './Home.css';

interface Names {
  names: string;
  prices: string;
  id: string;
  flag: boolean;
  HomeInput: (homeinput: string) => void; // 親コンポーネントに値を渡す関数
}

const Copyright = (props: TypographyProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    GPU Search {new Date().getFullYear()}.
  </Typography>
);

const Home: FC<Names> = ({ names, prices, id, flag = false, HomeInput }) => {
  const [search, setSearch] = useState('1650');
  const [input, setInput] = useState('1650');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const NoItemAlert = (indicateFlag: boolean) =>
    indicateFlag ? (
      <Alert className="alert" severity="error">
        {`${search}と一致する商品はありません。
        `}
        <br />
        別のキーワードで検索してください。
      </Alert>
    ) : (
      ''
    );

  const tiers = [
    {
      title: 'PC工房',
      price: [`${prices}`],
      description: [`${names}`],
      buttonText: 'Go To Shop',
      buttonVariant: 'contained',
      URL: `https://www.pc-koubou.jp/products/detail.php?product_id=${id}`,
    },
    {
      title: 'Amazon',
      price: ['準備中'],
      description: ['準備中'],
      buttonText: 'Go To Shop',
      buttonVariant: 'contained',
      URL: 'https://www.amazon.co.jp/',
    },
    {
      title: 'Rakuten',
      price: ['準備中'],
      description: ['準備中'],
      buttonText: 'Go To Shop',
      buttonVariant: 'contained',
      URL: 'https://www.rakuten.co.jp/',
    },
  ];

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }} />
      </AppBar>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        />
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        />
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div className="search-field">
            <TextField
              id="outlined-basic"
              label="Search field"
              type="text"
              variant="outlined"
              value={input}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  // エンターキー押下時の処理
                  setSearch(input);
                  HomeInput(input);
                }
              }}
            />
          </div>

          <Button
            className="search-button"
            variant="contained"
            onClick={() => {
              setSearch(input);
              HomeInput(input);
            }}
          >
            Search
          </Button>
          {NoItemAlert(flag)}
        </Grid>
      </Container>
      <p className="caution">※GPUが表示されない場合はリロードしてください</p>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ¥{tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <a
                    className="shop-link"
                    href={tier.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      fullWidth
                      variant={tier.buttonVariant as 'outlined' | 'contained'}
                    >
                      {tier.buttonText}
                    </Button>
                  </a>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </>
  );
};
export default Home;
