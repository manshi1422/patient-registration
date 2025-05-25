
import Register from "./components/Register";
import { PatientList } from "./components/PatientList";
import { SqlQuery } from "./components/SqlQuery";

export default function PatientRegistrationApp(props) {

  return (
   
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
