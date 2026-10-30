// Apple Vision OCR za kadrove iz videa (faza 0, lokalno i besplatno).
//
//   swift scripts/ocr.swift <slika.jpg> [<slika.jpg> ...]
//
// Za svaku sliku ispisuje "== <putanja>" pa prepoznate retke odozgo prema dolje.
import Foundation
import Vision

let putanje = Array(CommandLine.arguments.dropFirst())
if putanje.isEmpty {
    FileHandle.standardError.write("upotreba: swift scripts/ocr.swift <slika> [...]\n".data(using: .utf8)!)
    exit(2)
}

for putanja in putanje {
    print("== \(putanja)")
    let zahtjev = VNRecognizeTextRequest()
    zahtjev.recognitionLevel = .accurate
    zahtjev.recognitionLanguages = ["hr-HR", "en-US"]
    zahtjev.usesLanguageCorrection = true
    let obrada = VNImageRequestHandler(url: URL(fileURLWithPath: putanja), options: [:])
    do {
        try obrada.perform([zahtjev])
    } catch {
        print("!! \(error.localizedDescription)")
        continue
    }
    // Vision daje y od dna slike; sortiramo odozgo pa slijeva.
    let retci = (zahtjev.results ?? []).sorted {
        let a = $0.boundingBox, b = $1.boundingBox
        if abs(a.midY - b.midY) > 0.01 { return a.midY > b.midY }
        return a.minX < b.minX
    }
    for r in retci {
        if let t = r.topCandidates(1).first?.string { print(t) }
    }
}
