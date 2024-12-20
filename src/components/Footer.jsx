import React from "react";
import { Box, Typography, Grid, Link, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ py: 6, backgroundColor: "#333", color: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              About FarmerFolio
            </Typography>
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              FarmerFolio is dedicated to helping farmers manage their expenses
              and optimize resources to grow smarter.
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" color="inherit" underline="none">
                Features
              </Link>
              <Link href="#" color="inherit" underline="none">
                Pricing
              </Link>
              <Link href="#" color="inherit" underline="none">
                Contact Us
              </Link>
              <Link href="#" color="inherit" underline="none">
                FAQs
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Get in Touch
            </Typography>
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              Email: support@farmerfolio.com
            </Typography>
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              Phone: +1 (123) 456-7890
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            © {new Date().getFullYear()} FarmerFolio. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
