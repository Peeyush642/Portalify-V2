import Dashboard from "@/components/Dashboard/dashboard";
import Responses from "@/components/Dashboard/Responses/Response";
export default function Page({ params }) {
  const formID = params.formid;
  console.log("formID",formID);
  return (
    <>
      <Dashboard content={<Responses formid={formID} />} />
    </>
  );
}
