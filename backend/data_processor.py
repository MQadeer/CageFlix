import pandas as pd
import gzip
import json
import os

# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# File paths (relative to backend/)
FILES = {
    "title_basics": os.path.join(SCRIPT_DIR, "title.basics.tsv.gz"),
    "title_principals": os.path.join(SCRIPT_DIR, "title.principals.tsv.gz"),
    "title_ratings": os.path.join(SCRIPT_DIR, "title.ratings.tsv.gz"),
    "name_basics": os.path.join(SCRIPT_DIR, "name.basics.tsv.gz")
}

NICOLAS_CAGE_ID = "nm0000115"

def load_tsv_gz(filename):
    print(f"Loading {filename} ...")
    if not os.path.exists(filename):
        print(f"ERROR: File not found: {filename}")
        return None
    try:
        with gzip.open(filename, "rt", encoding="utf-8") as f:
            return pd.read_csv(f, sep="\t", low_memory=False, na_values="\\N")
    except Exception as e:
        print(f"ERROR loading {filename}: {e}")
        return None

def main():
    print(f"Working directory: {os.getcwd()}")
    print(f"Script directory: {SCRIPT_DIR}")
    # Load datasets
    basics = load_tsv_gz(FILES["title_basics"])
    if basics is None:
        print("Failed to load title_basics")
        return

    principals = load_tsv_gz(FILES["title_principals"])
    if principals is None:
        print("Failed to load title_principals")
        return

    ratings = load_tsv_gz(FILES["title_ratings"])
    if ratings is None:
        print("Failed to load title_ratings")
        return

    names = load_tsv_gz(FILES["name_basics"])
    if names is None:
        print("Failed to load name_basics")
        return

    # Filter for movies where Nicolas Cage is a principal
    cage_titles = principals[principals["nconst"] == NICOLAS_CAGE_ID]["tconst"].unique()
    print(f"Found {len(cage_titles)} titles with Nicolas Cage")

    # Get movie info
    movies = basics[basics["tconst"].isin(cage_titles)]
    movies = movies[movies["titleType"] == "movie"].copy()

    # Merge with ratings
    movies = movies.merge(ratings, on="tconst", how="left")

    # Get cast for each movie
    cast_dict = {}
    for tconst in movies["tconst"]:
        cast_ids = principals[(principals["tconst"] == tconst) & (principals["category"].isin(["actor", "actress"]))]["nconst"].tolist()
        cast_names = names[names["nconst"].isin(cast_ids)]["primaryName"].tolist()
        cast_dict[tconst] = cast_names

    # Build movie list
    movie_list = []
    for _, row in movies.iterrows():
        genres = row["genres"].split(",") if pd.notna(row["genres"]) else []
        cast = cast_dict.get(row["tconst"], [])
        movie = {
            "id": row["tconst"],
            "title": row["primaryTitle"],
            "originalTitle": row["originalTitle"] if pd.notna(row["originalTitle"]) else row["primaryTitle"],
            "year": int(row["startYear"]) if pd.notna(row["startYear"]) else None,
            "rating": float(row["averageRating"]) if pd.notna(row["averageRating"]) else None,
            "votes": int(row["numVotes"]) if pd.notna(row["numVotes"]) else 0,
            "genres": genres,
            "cast": cast,
            "runtime": int(row["runtimeMinutes"]) if pd.notna(row["runtimeMinutes"]) else None,
            "poster_url": "https://via.placeholder.com/300x450?text=No+Image"
        }
        # Only include movies with valid year and rating
        if movie["year"] and movie["rating"]:
            movie_list.append(movie)

    # Sort by year, newest first
    movie_list.sort(key=lambda x: x["year"], reverse=True)
    print(f"Processed {len(movie_list)} Nicolas Cage movies.")

    # Save to JSON
    output_file = os.path.join(SCRIPT_DIR, "movies_data.json")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(movie_list, f, indent=2, ensure_ascii=False)
    print(f"Saved to {output_file}")

if __name__ == "__main__":
    main() 