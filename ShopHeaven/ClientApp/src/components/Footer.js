import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
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
import { Fragment } from "react";
import { cartPath } from "../constants";

export default function Footer() {
  const FooterWrapper = styled(Box)({
    color: theme.palette.primary.main,
  });

  const FooterContent = styled(Box)({
    width: "80%",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
  });

  const BrandFooterWrapper = styled(Box)({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white.main,
  });

  const BrandFooterContent = styled(Box)({
    display: "block",
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
      marginBottom: theme.spacing(2),
    },
  });

  const Logo = styled("img")({
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
    gap: 9,
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
      width: "45%",
      margin: "auto",
    },
  });

 const StyledLink = styled("a") ({
  
 })

 const InnerLink = {
  textDecoration: "none"
 }

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
                    <Link to={"/"} style={InnerLink}>
                      Your Account
                    </Link>
                  </StyledListItem>
                  <StyledListItem>
                    <ShoppingCartCheckout />
                    <Link to={"/"} style={InnerLink}>
                      Your Orders
                    </Link>
                  </StyledListItem>
                  <StyledListItem>
                    <Reviews />
                    <Link to={"/"} style={InnerLink}>
                      Your Reviews
                    </Link>
                  </StyledListItem>
                  <StyledListItem>
                    <ShoppingCart />
                    <Link to={cartPath} style={InnerLink}>
                      Your Cart
                    </Link>
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
                    <Link to={"/"} style={InnerLink}>
                      Contact
                    </Link>
                  </StyledListItem>
                  <StyledListItem>
                    <Info />
                    <Link to={"/"} style={InnerLink}>
                      About
                    </Link>
                  </StyledListItem>
                  <StyledListItem>
                    <Campaign />
                    <Link to={"/"} style={InnerLink}>
                      Advertising
                    </Link>
                  </StyledListItem>
                  <StyledListItem>
                    <Security />
                    <Link to={"/"} style={InnerLink}>
                      Privacy Policy
                    </Link>
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
                    <StyledLink
                      href="https://www.linkedin.com/in/vasil-dimitrov-426abb146/"
                      target="blank"
                      style={InnerLink}
                    >
                      LinkedIn
                    </StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <GitHub />
                    <StyledLink
                      href="https://github.com/VasilDimitroff"
                      target="blank"
                      style={InnerLink}
                    >
                      GitHub
                    </StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <Facebook />
                    <StyledLink
                      href="https://www.facebook.com/vbdimitrov"
                      target="blank"
                      style={InnerLink}
                    >
                      Facebook
                    </StyledLink>
                  </StyledListItem>
                  <StyledListItem>
                    <AlternateEmail />
                    <StyledLink
                      href="mailto: v.b.dimitrow@gmail.com"
                      target="blank"
                      style={InnerLink}
                    >
                      Email
                    </StyledLink>
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
          <BrandFooterItemHolder>
            <Logo src={LogoImg} />
          </BrandFooterItemHolder>
          <BrandFooterItemHolder>
            <Typography sx={{ fontSize: "12px" }}>
              Copyright © {new Date().getFullYear()} Shop Heaven Inc
            </Typography>
          </BrandFooterItemHolder>
        </BrandFooterContent>
      </BrandFooterWrapper>
    </Box>
  );
}
