<script>
export default {
  data() {
    return {
      pageId: this.$route.params.pageId?? null
    }
  },
}
</script>
<template>
  <Default
    :title="`Edit`"
    :showContributionTips="true"
  >
    <p v-if="pageId">
      Please fill out this form to add content to the page with the ID 
      <code>{{ pageId }}</code>.
    </p>
    <p v-else>
      Please fill out this form to add content to a page.
    </p>

    <form method="POST" action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfnumIVMPpbzLhAlsg2qqLX0lH3Lg5FrXU3oEivRbrWCEKqhw/formResponse">
      <section>
        <label for="pageid">Page ID</label>
        <input 
          type="text" name="entry.127637428" required
          :value="pageId"
          id="pageid"
        >
        <div class="bottom">The page ID is the text you see in the URL (example: https://national-service.now.sh/<b>page-id</b>/)</div>
      </section>

      <section>
        <label for="content">Content</label>
        <textarea 
          name="entry.49067967" rows="10" required
          id="content"
        ></textarea>
        <div class="bottom">Enter any content you would like to add to the article.</div>
      </section>

      <section>
        <label for="credit">Credit</label>
        <textarea 
          name="entry.2145065775" rows="2" placeholder="u/"
          id="credit"
        ></textarea>
        <div class="bottom">Provide information such as your Reddit username, original Reddit posts, links to websites ...</div>
      </section>

      <button type="submit">Submit</button>
    </form>

  </Default>
</template>