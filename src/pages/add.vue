<template>
  <Default
    title="Add content"
    :showContributionTips="true"
  >
    <p>Please fill out this form to add content. All submissions are reviewed before being published. Thank you for your contribution!</p>

    <form method="POST" action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeIqWZHWuUizLuQqiIytc5YI67tGedYa82dNw86Knf9bZXFpQ/formResponse">
      <section>
        <label for="title">Title</label>
        <input 
          name="entry.1493795530" type="text" required 
          id="title"
        >
      </section>


      <section>
        <label for="content">Content</label>
        <textarea 
          name="entry.727214883" rows="10" required
          id="content"
        ></textarea>
      </section>

      <section>
        <label for="credit">Credit</label>
        <textarea 
          name="entry.475604388" rows="2" placeholder="u/"
          id="credit"
        ></textarea>
        <div class="bottom">Provide information such as your Reddit username, original Reddit posts, links to websites ...</div>
      </section>

      <button type="submit">Submit</button>
    </form>
  </Default>
</template>