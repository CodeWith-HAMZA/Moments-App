import React, { useContext, useEffect } from "react";
import { Alert, Button, Result, Space } from "antd";
import { Link } from "react-router-dom";
import Context from "../Context/Context";

const Notfound: React.FC = () => {
  const context = useContext(Context);
  // useEffect(() => {
  //   context?.messageApi.open({
  //     type: "error",
  //     content: "Forbidden! :(",
  //   });
  // }, []);

  return (
    <>
      <Alert
        message="Not Allowed!"
        description="Forbidden, The Link Is Broken Or The Page Has Been Moved, Try Again Later!"
        type="error"
        closable
        
        showIcon
      />

      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to={"/"}>Go Back</Link>
          </Button>
        }
      />
    </>
  );
};

export default Notfound;
