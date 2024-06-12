export function mailchimp() {
  const addAudience = async (email: string) => {
    const url = `${import.meta.env.VITE_MAILCHIMP_BASE_URL}?u=${import.meta.env.VITE_MAILCHIMP_UNIQUE_IDENTIFIE}&id=${import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID}&f_id=${import.meta.env.VITE_MAILCHIMP_FIELD_ID_TRACKING}`;
    const formData = new FormData();
    formData.append("EMAIL", email);
    /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
    formData.append(
      `b_${import.meta.env.VITE_MAILCHIMP_UNIQUE_IDENTIFIE}_${import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID}`,
      ""
    );
    formData.append("tags", import.meta.env.VITE_MAILCHIMP_TAG);
    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      return true;
    } catch (error) {
      console.error("Error subscribing:", error);
      return false;
    }
  };
  return {
    addAudience,
  };
}
