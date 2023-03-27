import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link
} from "@mui/material";
import {
  LinkedIn,
  GitHub,
  Facebook,
  AlternateEmail,
  Email,
  Info,
  Campaign,
  Security,
  AccountCircle,
  ShoppingCartCheckout,
  ShoppingCart,
  Reviews,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "./../theme";
import LogoImg from "../static/images/shop_heaven_logo_big_2.png";

export default function Footer(props) {
  const FooterWrapper = styled(Box)({
    backgroundColor: theme.palette.appBackground.main,
    color: theme.palette.primary.main,
  });

  const FooterContent = styled(Box)({
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1)
  });

  const BrandFooterWrapper = styled(Box)({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white.main,
  });
  
  const BrandFooterContent = styled(Box)({
      display:"block",
      margin: "auto",
      width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(0.1),
    
  });

  const SectionHeading = styled(Typography)({
    textTransform: "uppercase",
    fontWeight: "500",
    [theme.breakpoints.down("md")]: {
        textAlign: "center",
    },
  });

  const GridContentItem = styled(Grid)({
    [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(2)
    },
  });

  const Logo = styled('img')({
        width: "15%",
        [theme.breakpoints.down("md")]: {
            width: "45%",
        },
  });

  const BrandFooterItemHolder = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    alignContent: "center",
});

const StyledListItem = styled(ListItem)({
    display: "flex",
    [theme.breakpoints.down("md")]: {
        justifyContent:"flex-start",
        width: "45%",
        margin: "auto"
    },
})

const StyledLink = styled(Link)({
    marginLeft: theme.spacing(1.5)
})

  return (
    <Box>
      <FooterWrapper>
        <FooterContent>
          <Grid
            container
            columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexGrow: 1,
            }}
          >
            <GridContentItem item xs={12} sm={12} md={4} lg={4} xl={4} sx={{}}>
              <SectionHeading sx={{ mt: 4, mb: 2 }} variant="h5">
                Your Profile
              </SectionHeading>
              <Box>
                <List>
                  <StyledListItem>
                    <AccountCircle />
                    <StyledLink href="#" underline="hover">Your Account</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <ShoppingCartCheckout />
                    <StyledLink href="#" underline="hover">Your Orders</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <Reviews />
                    <StyledLink href="#" underline="hover">Your Reviews</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <ShoppingCart />
                    <StyledLink href="#" underline="hover">Your Cart</StyledLink>
                  </StyledListItem>
                </List>
              </Box>
            </GridContentItem>
            <GridContentItem item xs={12} sm={12} md={4} lg={4} xl={4} sx={{}}>
              <SectionHeading sx={{ mt: 4, mb: 2 }} variant="h5">
                Contact
              </SectionHeading>
              <Box>
                <List>
                  <StyledListItem>
                    <Email />
                    <StyledLink href="#" underline="hover">Contact</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <Info />
                    <StyledLink href="#" underline="hover">About</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <Campaign />
                    <StyledLink href="#" underline="hover">Advertising</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <Security />
                    <StyledLink href="#" underline="hover">Privacy Policy</StyledLink>
                  </StyledListItem>
                </List>
              </Box>
            </GridContentItem>
            <GridContentItem item xs={12} sm={12} md={4} lg={4} xl={4}>
              <SectionHeading sx={{ mt: 4, mb: 2 }} variant="h5">
                About developer
              </SectionHeading>
              <Box>
                <List>
                  <StyledListItem>
                    <LinkedIn />
                    <StyledLink href="https://www.linkedin.com/in/vasil-dimitrov-426abb146/" target="blank" underline="hover">LinkedIn</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <GitHub />
                    <StyledLink href="https://github.com/VasilDimitroff" target="blank" underline="hover">GitHub</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <Facebook />
                    <StyledLink href="https://www.facebook.com/vbdimitrov" target="blank" underline="hover">Facebook</StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <AlternateEmail />
                    <StyledLink href="mailto: v.b.dimitrow@gmail.com" target="blank" underline="hover">Email</StyledLink>
                  </StyledListItem>
                </List>
              </Box>
            </GridContentItem>
          </Grid>
        </FooterContent>
      </FooterWrapper>
      <Divider />
      <BrandFooterWrapper>
        <BrandFooterContent>
        <BrandFooterItemHolder >
            <Logo src={LogoImg}/>
            </BrandFooterItemHolder>
            <BrandFooterItemHolder >
            <Typography>
                 Copyright © { new Date().getFullYear() } Shop Heaven Inc
            </Typography>
            </BrandFooterItemHolder>
        </BrandFooterContent>
      </BrandFooterWrapper>
    </Box>
  );
}
