import React, { useEffect, useState } from "react";
// import { usePGlite } from "@electric-sql/pglite-react";
import { useLiveQuery } from "@electric-sql/pglite-react";

import Register from "./components/Register";
import { PatientList } from "./components/PatientList";
import { SqlQuery } from "./components/SqlQuery";
// const db = new PGlite();
const DB_NAME = "patient_registration_db";

export default function PatientRegistrationApp(props) {
  // const db = usePGlite();
  // const insertItem = () => {
  //   db.query(
  //     "INSERT INTO patients (id,name,age, gender) VALUES (2,'Arthur', 42,'male');"
  //   );
  // };
  const items = useLiveQuery.sql`
    SELECT *
    FROM patients
    ;
  `;
 
  // const [initialized, setInitialized] = useState(false);
  // const [patients, setPatients] = useState([]);
  // const [form, setForm] = useState({ name: "", age: "", gender: "" });
  // const [query, setQuery] = useState("SELECT * FROM patients;");
  // const [queryResult, setQueryResult] = useState([]);

  //   useEffect(() => {
  //     (async () => {
  //     //   db = new Database(DB_NAME);
  //       await db.exec(`
  //         CREATE TABLE IF NOT EXISTS patients (
  //           id SERIAL PRIMARY KEY,
  //           name TEXT NOT NULL,
  //           age INTEGER NOT NULL,
  //           gender TEXT NOT NULL
  //         );
  //       `);
  //       await fetchPatients();
  //       setInitialized(true);
  //     })();

  //     const channel = new BroadcastChannel("patient-db-sync");
  //     channel.onmessage = (e) => {
  //       if (e.data === "update") fetchPatients();
  //     };

  //     return () => channel.close();
  //   }, []);

  // const broadcastUpdate = () => {
  //   const channel = new BroadcastChannel("patient-db-sync");
  //   channel.postMessage("update");
  //   channel.close();
  // };

  //   const fetchPatients = async () => {
  //     const result = await db.query("SELECT * FROM patients;");
  //     setPatients(result.rows);
  //   };

  //   const handleRegister = async () => {
  //     if (!form.name || !form.age || !form.gender) return;
  //     await db.exec("INSERT INTO patients (name, age, gender) VALUES (?, ?, ?);", [
  //       form.name,
  //       parseInt(form.age),
  //       form.gender,
  //     ]);
  //     setForm({ name: "", age: "", gender: "" });
  //     await fetchPatients();
  //     broadcastUpdate();
  //   };

  //   const handleQuery = async () => {
  //     try {
  //       const result = await db.query(query);
  //       setQueryResult(result.rows);
  //     } catch (err) {
  //       alert("SQL Error: " + err.message);
  //     }
  //   };
  const handleRegister = () => {};
  const handleQuery = () => {};
  // if (!initialized) return <p>Loading database...</p>;

  return (
    // <Box style={{ padding: 24, maxWidth: 800, margin: "auto" }}>
    //   <Card style={{ marginBottom: 24 }}>
    //     <CardContent>
    //       <Typography variant="h5" gutterBottom>Register New Patient</Typography>
    //       <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    //         <TextField
    //           label="Name"
    //           value={form.name}
    //           onChange={(e) => setForm({ ...form, name: e.target.value })}
    //         />
    //         <TextField
    //           label="Age"
    //           type="number"
    //           value={form.age}
    //           onChange={(e) => setForm({ ...form, age: e.target.value })}
    //         />
    //         <TextField
    //           label="Gender"
    //           value={form.gender}
    //           onChange={(e) => setForm({ ...form, gender: e.target.value })}
    //         />
    //         <Button variant="contained" onClick={handleRegister}>Register</Button>
    //       </Box>
    //     </CardContent>
    //   </Card>

    //   <Card style={{ marginBottom: 24 }}>
    //     <CardContent>
    //       <Typography variant="h5" gutterBottom>SQL Query</Typography>
    //       <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    //         <TextField
    //           label="SQL Statement"
    //           value={query}
    //           onChange={(e) => setQuery(e.target.value)}
    //           multiline
    //           rows={2}
    //           InputProps={{ style: { fontFamily: "monospace" } }}
    //         />
    //         <Button variant="contained" onClick={handleQuery}>Execute Query</Button>
    //         <Box style={{ backgroundColor: "#f5f5f5", padding: 12 }}>
    //           {queryResult.map((row, idx) => (
    //             <Typography key={idx} style={{ fontFamily: "monospace" }}>
    //               {JSON.stringify(row)}
    //             </Typography>
    //           ))}
    //         </Box>
    //       </Box>
    //     </CardContent>
    //   </Card>

    //   <Card>
    //     <CardContent>
    //       <Typography variant="h5" gutterBottom>Registered Patients</Typography>
    //       <ul style={{ paddingLeft: 20 }}>
    //         {patients.map((p) => (
    //           <li key={p.id}>{`${p.name}, ${p.age}, ${p.gender}`}</li>
    //         ))}
    //       </ul>
    //     </CardContent>
    //   </Card>
    // </Box>
    <>
    
      <div style={{marginTop:"120px" ,margin:"calc(var(--template-frame-height, 0px) + 28px)" }}>
        {props.tab == "register" ? (
            <Register/>
        ) : props.tab == "list" ? (
          <PatientList/>
        ) : (
          <SqlQuery/>
        )}
      </div>
    </>
  );
}
