import { Button } from "@heroui/react";
import { Spinner } from "@heroui/react";
export default function AppButton({ children, isLoading, ...props }) {
  return (
    <>
      <div className="w-full">
        <Button {...props} className="w-full" color="primary">
          {isLoading && <Spinner color="white" size="sm" />}
          {children}
        </Button>
      </div>
    </>
  );
}
