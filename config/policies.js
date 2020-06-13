/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'view-faq': true,
  'view-contact': true,
  'legal/view-terms': true,
  'legal/view-privacy': true,
  'deliver-contact-form-message': true,

  'dev/view-devpage': true,
  'example/view-quill-view-page': true,
  'example/view-quill-edit-page': true,
  'dev/*': true,

  'api/v1/quill/update': true,
  'example/update-content': true,
  'example/view-dropdown-as-select': true,
  // 'example-dropdown': true,

  // 'example/dropdown_as_select': true,

};
