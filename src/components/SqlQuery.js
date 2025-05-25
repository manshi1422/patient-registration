"use client";

import {  useState } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { PlayArrow, Storage } from "@mui/icons-material";
import { usePGlite } from "@electric-sql/pglite-react";

export function SqlQuery() {
  
  const [query, setQuery] = useState(
    "SELECT * FROM patients;"
  );
  const [result, setResult] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [alert, setAlert] = useState(null);
  const db = usePGlite();
  const executeQuery = async () => {
   
    if (!query.trim()) {
      setAlert({
        type: "error",
        message: "Please enter a SQL query to execute.",
      });
      return;
    }

    setIsExecuting(true);
    setAlert(null);
    setResult(null);

    try {
      const queryResult = await db.query(query);
      setResult(queryResult?.rows);


      setAlert({
        type: "success",
        message: `${query.includes("COUNT")?`total patients : ${queryResult?.rows[0]?.total_patients}`:`Query executed successfully. Returned ${queryResult?.rows?.length} row(s)`}`,
      });
    } catch (err) {
      const errorMessage = err.message || "Unknown error occurred";
      setAlert({
        type: "error", 
        message: errorMessage,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const sampleQueries = [
    {
      name: "All Patients",
      query: "SELECT * FROM patients;",
    },
   
    {
      name: "Patients with phone",
      query:
        "SELECT * FROM patients WHERE phone IS NOT NULL;",
    },
    {
      name: "Patient Count",
      query: "SELECT COUNT(*) as total_patients FROM patients;",
    },
   
  ];

  return (
    <Box>
      {alert && (
        <Alert
          severity={alert.type}
          style={{ marginBottom: "16px" }}
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      <Box style={{ marginBottom: "24px" }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <Storage />
          <Typography variant="h6">SQL Query</Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={6}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          variant="outlined"
          style={{ fontFamily: "monospace", marginBottom: "16px" }}
        />

        <Button
          onClick={executeQuery}
          disabled={isExecuting}
          variant="contained"
          startIcon={
            isExecuting ? <CircularProgress size={20} /> : <PlayArrow />
          }
        >
          {isExecuting ? "Executing..." : "Execute Query"}
        </Button>
      </Box>

      <Box style={{ marginBottom: "24px" }}>
        <Typography variant="h6" style={{ marginBottom: "16px" }}>
          Sample Queries
        </Typography>
        <Grid container spacing={2}>
          {sampleQueries.map((sample, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                style={{ cursor: "pointer", height: "100%" }}
                onClick={() => setQuery(sample.query)}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", marginBottom: "8px" }}
                  >
                    {sample.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "12px" }}
                  >
                    {sample.query.substring(0, 50)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {result?.length!==0 && (
        <Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <Typography variant="h6">Query Results</Typography>
            <Chip
              label={`${result?.length} row${
                result?.length !== 1 ? "s" : ""
              }`}
              color="primary"
              variant="outlined"
            />
          </Box>

          {result?.length === 0 ? (
            <Box
              style={{
                textAlign: "center",
                padding: "32px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <Typography color="text.secondary">No rows returned</Typography>
            </Box>
          ) : (
             <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Age</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Gender</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Address</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Phone</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {result?.map((patient) => (
                <TableRow hover key={patient?.id}>
                  <TableCell style={{ fontWeight: "medium" }}>
                    {patient?.name}
                  </TableCell>
                  <TableCell>{patient?.age || "-"}</TableCell>
                  <TableCell>{patient?.gender || "-"}</TableCell>
                  <TableCell>{patient?.address || "-"}</TableCell>
                  <TableCell>{patient?.phone || "-"}</TableCell>
               
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          )}
        </Box>
      )}
    </Box>
  );
}
