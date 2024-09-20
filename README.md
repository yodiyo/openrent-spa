# OpenRent Landlord Newshub

This application demonstrates rebuilding the OpenRent Newshub as a Single Page Application using ReactJS with a focus on UI and UX design.

Consideration has been given to the following:
* Colours - palette built around the OpenRent logo colour and taking into account accessibility contrast considerations. For example, the menu links contrast ratio has been increased to meet AA accessibility thresholds.
* Responsive design
  * Built with mobile first principle and progressive degradation
  * Just used single breakpoint in first instance, but more could be added in future.
  * Mobile menu - fairly simple approach for MVP.
* Fonts
	* used a strong family font Oswald for headings to provide confidence and high legibility.
	* Poppins for body text to give a modern twist on traditional sans serif typefaces.
* Layout
	* Landing page with full screen image, strong message and call to action button. The content is being pulled in from the OpenRent blog page. The image was selected from Unsplashed and is directly added in the repo, but, in reality, this image would be pulled from the blog page.
	* Navigation - as a React app, the News submenu links are dynamically generated from the blog site. These same categories also populate the filters.
	* Index page
	  * using Flexbox and CSS Grid to output the articles in responsive grid formation with category filters on left to give it a fresh feel.
	  * buttons highlight if a category has been selected from menu or from filters.
	  * search - very basic and needs more time to refine so that it doesn't do things like pick up links to other articles. A more intelligent model like ElasticFilters would really help here.
  * Article pages
  	  * apart from pulling in the content and images, I've not spent much time on this, just global spacing and layout.
   * Currently the image fills the screen and the title drops below the fold - this should be adapted so that the title is visible, either over the image or with an image/title split.
   * It would be good to display the article category too, maybe with a breadcrumb, otherwise a label (colour-coded labels for categories would be a nice touch).
   * Links and other elements in the article also need a rethink.
* TO DOs
  * Add footer with contact details, link to contact form and important links.
  * Optimise images
  * Caching content and images
  * Currently, I am only fetching 25 articles as we hit security issues otherwise. In reality, we would paginate the data.
	* This is why some categories display no posts, when posts do exist in that category. But categories display based on the category.count property.
  * The CSS needs to be modularised, ideally using SASS components, elements, variables ane mixins
  * Using one file, I have added some variables for now, but this definitely needs building out.
  * Accessibility - I have done some cursory tests using the Axe Accessibility tool on navigation, filters and colours, but more thorough testing is needed including for screenreaders, contrasts and keyboard functionality.
  * Create a design system, using something like Storybook, to enable complex, durable, and accessible user interfaces across projects.
  * Testing - unit and end-to-end testing to ensure updates to the site as well as the API are checked and any issues are flagged.

