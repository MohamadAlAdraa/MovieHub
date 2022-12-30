const useGenres = (selectedGenres) =>{
    if(selectedGenres.length <1) return '';

    const selectedGenresIds = selectedGenres.map(g=>g.id).join(',');
    return selectedGenresIds;
} 

export default useGenres;