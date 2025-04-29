import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
} from '@mui/material';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [insights, setInsights] = useState({});
  const [loadingCourseId, setLoadingCourseId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5009/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const getImageForCourse = (courseId) => `/${courseId}.png`;

  const generateInsight = async (course) => {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    setLoadingCourseId(course.id);

    const prompt = `
You are an AI assistant helping refinery workers choose relevant courses.

Here is a course:
Title: ${course.title}
Description: ${course.description}

In 2-3 sentences, explain how the skills or knowledge from this course would be useful in a refinery environment. Be clear, helpful, and use industry-relevant terms if appropriate.
`;

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const responseData = await response.json();
      const content = responseData.choices?.[0]?.message?.content ?? 'No insight generated.';
      setInsights((prev) => ({ ...prev, [course.id]: content }));
    } catch (error) {
      console.error('Error generating insight:', error);
      setInsights((prev) => ({ ...prev, [course.id]: 'Failed to generate insight.' }));
    } finally {
      setLoadingCourseId(null);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f3f4f6',
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 6 }}>
        Courses Offered
      </Typography>

      <Container maxWidth="md">
        {courses.map((course) => (
          <Box
            key={course.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'flex-start',
              border: '1px solid #ddd',
              borderRadius: 2,
              boxShadow: 3,
              p: 3,
              mb: 5,
              backgroundColor: 'white',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
              },
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', md: '300px' },
                height: '200px',
                mr: { md: 3 },
                mb: { xs: 2, md: 0 },
                flexShrink: 0,
              }}
            >
              <img
                src={getImageForCourse(course.id)}
                alt={course.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                {course.title}
              </Typography>

              <Typography sx={{ mt: 1, color: '#555' }}>{course.description}</Typography>

              <Typography sx={{ mt: 2, color: '#444' }}>
                <strong>Start Date:</strong> {new Date(course.start_date).toLocaleDateString()}
              </Typography>

              <Typography sx={{ color: '#444' }}>
                <strong>End Date:</strong> {new Date(course.end_date).toLocaleDateString()}
              </Typography>

              <Typography sx={{ mt: 1.5, fontWeight: 'bold', fontSize: '1.25rem', color: 'green' }}>
                ${course.price} USD
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => generateInsight(course)}
                  disabled={loadingCourseId === course.id}
                  sx={{
                    backgroundColor: '#e5e7eb',
                    color: '#1f2937',
                    fontWeight: 500,
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.375rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#d1d5db',
                    },
                    '&:disabled': {
                      opacity: 0.5,
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  {loadingCourseId === course.id ? (
                    <CircularProgress size={20} />
                  ) : (
                    'Why Should I Take This?'
                  )}
                </Button>
              </Box>

              {insights[course.id] && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 2,
                  }}
                >
                  <Typography sx={{ fontStyle: 'italic', color: '#374151' }}>
                    {insights[course.id]}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default CoursesPage;
