"use client";

import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useLiveIncrementalQuery } from "@electric-sql/pglite-react";

export function PatientList() {

const  items = useLiveIncrementalQuery(`
    SELECT *
    FROM patients;
  `);

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search patients by name, email, or phone..."
          //   value={searchTerm}
          //   onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <Search style={{ marginRight: "8px", color: "#666" }} />
            ),
          }}
          variant="outlined"
          size="small"
        />
      </Box>

      {items?.rows?.length === 0 ? (
        <Box style={{ textAlign: "center", padding: "32px", color: "#666" }}>
          <Typography>
            {items?.rows?.length === 0
              ? "No patients registered yet."
              : "No patients match your search."}
          </Typography>
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
              {items?.rows?.map((patient) => (
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
  );
}
