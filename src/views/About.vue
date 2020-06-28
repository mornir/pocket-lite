<template>
  <div class="max-w-2xl px-4 pt-12 pb-8">
    <h2>What is Pocket Lite?</h2>
    <p>
      Pocket Lite is a web client that lets you interact with your
      <a
        target="_blank"
        href="https://getpocket.com/connected_applications"
        rel="noopener"
      >
        Pocket account</a
      >. <br />
      It provides a minimalist interface that optimized for corporate
      environnements where web extensions are blocked and access to social
      networks restricted.
    </p>
    <h2>Why I made Pocket Lite?</h2>
    <p>
      At my workplace, we have corporate policies in place that restrict the
      installation of web extensions and the access to some websites (Twitter,
      Facebook, etc.). The problem is that I often save articles to Pocket from
      Twitter (on my smartphone), but those articles get added under the shorten
      URL created by Twitter (t.co), which redirects to the original URL. But at
      work the redirection is blocked. However, Pocket also provides a
      <code>resolved_url</code> property to the original article. However, to
      obtain that URL, you need to copy it from the share menu, which is a bit
      cumbersome. That's why I decided to rebuild Pocket to better suit my
      needs.
    </p>
    <h2>Pocket Lite compared to Pocket</h2>
    <ul class="pb-8 ml-4 list-disc">
      <li>
        Minimalist: adding and archiving articles (no in-app reader, tags, etc.)
      </li>

      <li>
        Open the <code>resolved_url</code> instead of the <code>given_url</code>
      </li>
      <li>Show the total of saved articles counts</li>
      <li>
        Easy to add URLs (for users who can't use the web extension)
      </li>
      <li>Easy to reach <i>Mark as read</i> function</li>
    </ul>
    <h2>How to use?</h2>
    <p>
      The first time you log into Pocket Lite, you will be prompted to grant
      access to it. You can revoke that access anytime you want in your
      <a
        target="_blank"
        href="https://getpocket.com/connected_applications"
        rel="noopener"
      >
        Pocket account</a
      >.
    </p>
  </div>
</template>

<style lang="postcss" scoped>
h2 {
  @apply font-bold text-2xl mb-4;
}

p {
  @apply mb-8;
}
a {
  @apply border-b-2 border-primary;
}
</style>
