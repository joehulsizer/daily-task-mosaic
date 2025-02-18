
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Shopping = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fadeIn">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Shopping</h1>
            <p className="text-muted-foreground mt-2">Manage your shopping lists and items</p>
          </div>
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add List
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Shopping Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Shopping;
