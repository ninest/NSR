export default function ({redirect,route}) {
  if (route.path != '/mn')
    return redirect('/mn')
}