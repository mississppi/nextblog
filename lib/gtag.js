const GA_TRACKING_ID = process.env.ga_tracking_id;

const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

const event = ({ action, category, label, value }) => {
  window.gtag("evnet", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export { GA_TRACKING_ID, pageview, event };
