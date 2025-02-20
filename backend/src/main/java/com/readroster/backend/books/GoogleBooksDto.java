package com.readroster.backend.books;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleBooksDto {
    private VolumeInfo volumeInfo;
    private String id;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class VolumeInfo {
        private String title;
        private String[] authors;
        private ImageLinks imageLinks;
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String[] getAuthors() { return authors; }
        public void setAuthors(String[] authors) { this.authors = authors; }
        public ImageLinks getImageLinks() { return imageLinks; }
        public void setImageLinks(ImageLinks imageLinks) { this.imageLinks = imageLinks; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ImageLinks {
        private String thumbnail;
        public String getThumbnail() { return thumbnail; }
        public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }
    }

    public VolumeInfo getVolumeInfo() { return volumeInfo; }
    public void setVolumeInfo(VolumeInfo volumeInfo) { this.volumeInfo = volumeInfo; }
}

