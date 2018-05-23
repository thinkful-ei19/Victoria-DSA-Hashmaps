const library = [
  { author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' },
  { author: 'Sams', dewey: '005.133', title: 'Teach Yourself C++ In 21 Days' },
  { author: 'Stroustrup., Bjarne', dewey: '005.133', title: 'The C++ Programming Language' },
  { author: 'Crockford, Douglas', dewey: '005.2762', title: 'JavaScript: The Good Parts' },
  { author: 'Flanagan, David', dewey: '005.2762', title: 'JavaScript: The Definitive Guide' },
  { author: 'Schmidt, Meinhard', dewey: '005.44684', title: 'Windows Vista for Dummies' },
  { author: 'Zondervan', dewey: '220.52081', title: 'NIV Study Bible' },
  { author:'Humphries, Russell, Dr.', dewey: '231.7652', title: 'Starlight and Time' },
  { author: 'Jane, Frederick Thomas', dewey: '623.82509051', title: 'Jane\'s Fighting Ships' },
  { author: 'Norris, Chuck', dewey: '796.8092', title: 'The Official Chuck Norris Fact Book' }
];

function bookSearch(library, book){
  const dewayFilter = library.filter(libBook => libBook.dewey === book.dewey)
  if(dewayFilter.length === 1){
    return  dewayFilter;
  }
  const authorFilter = dewayFilter.filter(libBook => libBook.author === book.author)
  if(authorFilter.length === 1){
    return authorFilter
  }
  const titleFilter = authorFilter.filter(libBook => libBook.title === book.title)
  return titleFilter
}

const book = { author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' }
console.log(bookSearch(library, book))
