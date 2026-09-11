import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewSnippetPage() {
  return (
    <form>
      <div className="grid gap-1">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="my code snippet" />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="language">Language</Label>
        <Input id="language" name="language" placeholder="typescript" />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" placeholder="lorem ipsum" />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="code">Code</Label>
        <Input id="code" name="code" placeholder="type pomodoro = {}" />
      </div>
      <Button type="submit">Create snippet</Button>
    </form>
  );
}
