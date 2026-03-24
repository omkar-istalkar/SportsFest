package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.UploadedFile;
import com.example.demo.repository.UploadedFileRepository;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController 
{
    @Autowired
    private UploadedFileRepository fileRepository;

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id)
    {
        Optional<UploadedFile> optionalFile = fileRepository.findById(id);

        if (!optionalFile.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        UploadedFile file = optionalFile.get();

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(file.getFileType())).header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\""+file.getFileName()+"\"").body(file.getData());
    }
}
