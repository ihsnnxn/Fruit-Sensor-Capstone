"""
# Simple ML training skeleton (PyTorch style).
# Replace dataset loader and model with real logic.
"""

import os
import torch
import torchvision.transforms as T
from torchvision.datasets import ImageFolder
from torchvision.models import resnet18
from torch.utils.data import DataLoader
import torch.nn as nn
import torch.optim as optim

DATA_DIR = "sample_images"  # small number of images for example

def main():
    if not os.path.exists(DATA_DIR):
        print("No sample images found. Create sample_images/<class>/*.jpg")
        return

    transform = T.Compose([T.Resize((224,224)), T.ToTensor()])
    dataset = ImageFolder(DATA_DIR, transform=transform)
    loader = DataLoader(dataset, batch_size=8, shuffle=True)

    model = resnet18(pretrained=True)
    model.fc = nn.Linear(model.fc.in_features, len(dataset.classes))

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-4)

    for epoch in range(3):
        model.train()
        for imgs, labels in loader:
            imgs, labels = imgs.to(device), labels.to(device)
            preds = model(imgs)
            loss = criterion(preds, labels)
            optimizer.zero_grad(); loss.backward(); optimizer.step()
        print(f"Epoch {epoch+1} done")

    torch.save(model.state_dict(), "model.pth")
    print("Model saved to model.pth")

if __name__ == "__main__":
    main()
