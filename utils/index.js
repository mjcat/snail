const allRoles = [
  {
    label: 'Training / Entry Level',
    value: 'tr',
  },
  {
    label: 'Individual Contributor',
    value: 'ic',
  },
  {
    label: 'Senior Contributor',
    value: 's',
  },
  {
    label: 'Lead / Manager',
    value: 'm',
  },
  {
    label: 'Director',
    value: 'd',
  },
  {
    label: 'Early Stage Startup Founder',
    value: 'f',
  },
];

const roleCodes = allRoles.map((role) => { return role.value });

export { allRoles, roleCodes };