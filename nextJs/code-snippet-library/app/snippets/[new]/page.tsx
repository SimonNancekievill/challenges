export default function NewSnippetPage() {
  return (
    <form>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" placeholder="my code snippet" />
      </div>
      <div>
        <label htmlFor="language">Language</label>
        <input id="language" name="language" placeholder="typescript" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input id="description" name="description" placeholder="lorem ipsum" />
      </div>
      <div>
        <label htmlFor="code">Code</label>
        <input id="code" name="code" placeholder="type pomodoro = {}" />
      </div>
      <button type="submit">Create snippet</button>
    </form>
  );
}
