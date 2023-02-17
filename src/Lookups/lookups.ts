import {UserToSignUp} from '../Components/interfaces'

const placeholderLookup: {[key: string]: keyof UserToSignUp} = {
  'First Name': 'first_name',
  'Last Name': 'last_name',
  'Email': 'email',
  'Password': 'password'
}
const Lookups = {
  placeholderLookup
};

export default Lookups;
