import React from "react";
import { Box, Typography, Grid, Avatar, Container } from "@mui/material";

const testimonials = [
  {
    name: "John Doe",
    image: "john.jpg", // Replace with your image paths
    quote: "FarmerFolio has transformed the way I manage my farm expenses.",
  },
  {
    name: "Jane Smith",
    image: "jane.jpg",
    quote: "The analytics feature helped me identify areas to cut costs.",
  },
  {
    name: "Bob Johnson",
    image: "bob.jpg",
    quote: "I love how easy it is to track my inventory and plan crops.",
  },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, mb: 6 }}>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Avatar
                  //   src={require(`../assets/${testimonial.image}`).default}
                  src=""
                  alt={testimonial.name}
                  sx={{ width: 80, height: 80, margin: "0 auto" }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary", fontStyle: "italic" }}
                >
                  "{testimonial.quote}"
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
