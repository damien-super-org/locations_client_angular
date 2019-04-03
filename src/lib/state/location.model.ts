export interface Location {
  uuid: string;
  organisation_uuid: string;
  name: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  address_line4: string;
  postcode: string;
  city: string;
  country: string;
  administrative_level1: string;
  administrative_level2: string;
  administrative_level3: string;
  administrative_level4: string;
  latitude: string;
  longitude: string;
  notes: string;
  create_date: string;
  edit_date: string;
  workflowlevel2_uuid: string;
  profiletype: string;
  // add other properties here
}
