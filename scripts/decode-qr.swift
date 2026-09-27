import AppKit
import Foundation
import Vision

let paths = Array(CommandLine.arguments.dropFirst())
guard !paths.isEmpty else {
  fputs("Usage: swift scripts/decode-qr.swift <image> [...]\n", stderr)
  exit(2)
}

for path in paths {
  guard
    let image = NSImage(contentsOfFile: path),
    let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil)
  else {
    fputs("Unable to read \(path)\n", stderr)
    exit(1)
  }

  let request = VNDetectBarcodesRequest()
  request.symbologies = [.qr]
  let handler = VNImageRequestHandler(cgImage: cgImage)
  try handler.perform([request])

  let payloads = (request.results ?? []).compactMap(\.payloadStringValue)
  guard payloads.count == 1 else {
    fputs("Expected one QR payload in \(path), found \(payloads.count)\n", stderr)
    exit(1)
  }
  print("\(path): \(payloads[0])")
}
